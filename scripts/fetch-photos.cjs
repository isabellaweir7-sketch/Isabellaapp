// Finds a real, matching Unsplash photo for every recipe in mockData.ts.
//
// HOW TO USE (no coding knowledge needed):
//   1. In the terminal, run this, replacing YOUR_KEY_HERE with your real
//      Unsplash Access Key (keep everything else exactly as it is):
//
//        UNSPLASH_ACCESS_KEY=YOUR_KEY_HERE node scripts/fetch-photos.cjs
//
//   2. Watch it print progress. It saves as it goes, so it's completely safe
//      to stop it (close the tab, let it time out, whatever) and run the
//      exact same command again later — it will pick up where it left off
//      and never redo work or duplicate anything.
//   3. When it prints "All recipes processed!", it's done. Tell Claude, and
//      send back the file it created: scripts/photo_matches.json
//
// The key is only ever typed into the terminal command itself, never saved
// into a file — so there's no risk of it accidentally ending up committed
// to the (public) repo.
//
// This deliberately paces itself well under Unsplash's Demo-tier limit
// (50 requests/hour) so it never puts the API key at risk — each recipe
// costs 2 requests (one search + one required "usage" ping), so the whole
// library takes roughly 16 hours of this being left open. That's fine:
// just let it run in whatever chunks suit you.

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_ROOT = path.join(__dirname, '..');
const MOCKDATA_PATH = path.join(REPO_ROOT, 'mockData.ts');
const CHECKPOINT_PATH = path.join(__dirname, 'photo_matches.json');

const SECONDS_BETWEEN_REQUESTS = 75; // safety margin over the strict 72s/request ceiling
const COOLDOWN_MS = 20 * 60 * 1000; // if we ever get close to the hourly cap, pause 20 min

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function httpsGetJSON(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'Accept-Version': 'v1' } }, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          let body = null;
          try {
            body = JSON.parse(data);
          } catch {
            // leave body null; caller checks res.status instead
          }
          resolve({ status: res.statusCode, headers: res.headers, body });
        });
      })
      .on('error', reject);
  });
}

// Recipe titles are often more specific than a stock library will have an
// exact photo for ("Miso vegetable noodle soup"); stripping parenthetical
// asides and "with X" tails tends to surface better, broader search hits
// than searching the full literal title.
function searchQueryFor(title) {
  return title
    .replace(/\([^)]*\)/g, '')
    .replace(/\bwith\b.*/i, '')
    .trim();
}

function readRecipesFromMockData() {
  const src = fs.readFileSync(MOCKDATA_PATH, 'utf8');
  const lines = src.split('\n');
  const idRe = /^\s*id: '(recipe-[a-z0-9-]+|community-[a-z0-9-]+)',/;
  const titleRe = /^\s*title: '(.+)',/;
  const recipes = [];
  let currentId = null;
  for (const line of lines) {
    const idMatch = line.match(idRe);
    if (idMatch) {
      currentId = idMatch[1];
      continue;
    }
    const titleMatch = line.match(titleRe);
    if (titleMatch && currentId) {
      recipes.push({ id: currentId, title: titleMatch[1] });
      currentId = null;
    }
  }
  return recipes;
}

function loadCheckpoint() {
  if (!fs.existsSync(CHECKPOINT_PATH)) return {};
  return JSON.parse(fs.readFileSync(CHECKPOINT_PATH, 'utf8'));
}

function saveCheckpoint(matches) {
  fs.writeFileSync(CHECKPOINT_PATH, JSON.stringify(matches, null, 2));
}

async function main() {
  if (!ACCESS_KEY) {
    console.log('No Access Key found. Run the command like this, with your real key in place of YOUR_KEY_HERE:');
    console.log('  UNSPLASH_ACCESS_KEY=YOUR_KEY_HERE node scripts/fetch-photos.cjs');
    return;
  }

  const recipes = readRecipesFromMockData();
  const matches = loadCheckpoint();
  const remaining = recipes.filter((r) => !matches[r.id]);

  console.log(`Total recipes: ${recipes.length}`);
  console.log(`Already done in a previous run: ${recipes.length - remaining.length}`);
  console.log(`Left to do this run: ${remaining.length}`);
  console.log('');

  for (let i = 0; i < remaining.length; i++) {
    const recipe = remaining[i];
    const query = encodeURIComponent(searchQueryFor(recipe.title));
    const searchUrl = `https://api.unsplash.com/search/photos?query=${query}&per_page=1&client_id=${ACCESS_KEY}`;

    let result;
    try {
      result = await httpsGetJSON(searchUrl);
    } catch (err) {
      console.log(`Network hiccup on "${recipe.title}" (${err.message}). Stopping for now — just run this again later.`);
      break;
    }

    if (result.status === 401 || result.status === 403) {
      console.log(`Unsplash rejected the request (status ${result.status}). Double check the Access Key is correct, then run this again.`);
      break;
    }
    if (result.status === 429) {
      console.log('Hit the hourly limit. Stopping here to stay safe — just run this again later to continue.');
      break;
    }
    if (result.status !== 200 || !result.body) {
      console.log(`Unexpected response (${result.status}) for "${recipe.title}" — skipping it for now, will retry next run.`);
      await sleep(SECONDS_BETWEEN_REQUESTS * 1000);
      continue;
    }

    const photo = result.body.results && result.body.results[0];

    if (photo) {
      matches[recipe.id] = {
        title: recipe.title,
        searchQuery: searchQueryFor(recipe.title),
        photo: photo.urls.regular,
        photographerName: photo.user.name,
        photographerUsername: photo.user.username,
        photoPageUrl: photo.links.html,
      };
      console.log(`[${i + 1}/${remaining.length}] Found a photo for: ${recipe.title}`);

      // Required by Unsplash's API Guidelines: ping this endpoint whenever
      // a photo found via search is actually used, so the photographer's
      // usage stats are counted correctly.
      await sleep(SECONDS_BETWEEN_REQUESTS * 1000);
      try {
        await httpsGetJSON(`${photo.links.download_location}&client_id=${ACCESS_KEY}`);
      } catch {
        // Non-critical if this single ping fails — the photo match itself is still saved.
      }
    } else {
      matches[recipe.id] = { title: recipe.title, searchQuery: searchQueryFor(recipe.title), photo: null };
      console.log(`[${i + 1}/${remaining.length}] No good result for: ${recipe.title} (flagged for review)`);
    }

    saveCheckpoint(matches);

    const remainingQuota = parseInt(result.headers['x-ratelimit-remaining'], 10);
    if (!isNaN(remainingQuota) && remainingQuota <= 2) {
      console.log('Getting close to the hourly limit — pausing for 20 minutes to stay well within it.');
      await sleep(COOLDOWN_MS);
    } else {
      await sleep(SECONDS_BETWEEN_REQUESTS * 1000);
    }
  }

  const stillLeft = recipes.filter((r) => !matches[r.id]).length;
  if (stillLeft === 0) {
    console.log('');
    console.log('All recipes processed! Send scripts/photo_matches.json back so it can be applied.');
  } else {
    console.log('');
    console.log(`Stopped for now with ${stillLeft} recipes left. Run the exact same command again anytime to continue.`);
  }
}

main();
