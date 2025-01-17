# AnnoyME API
You solve the 3 puzzles, I get a notification (checking every 5 seconds)

A dedicated website exists to let you interface with the api easier (for reciving or sending)

## Endpoints

### the API has 4 GET requests:
Theses are for getting each question

- **`/api/riddlemethis`**
- **`/api/math`**
- **`/api/unscramble`**
All return JSON of
```json
{
	"question": "...",
	"id": 1,
}
```

And this is to check for successes
- **`/api/getannoyed`**
Returns a json string to send as the notification

---

### The API has 1 POST request:
- **`/api/checkandsubmit`**
It execpts the JSON
```json
{
	"mathAnswer": 4,
	"mathID": 1,
	"riddleAnswer": "...",
	"riddleID": 1,
	"unscrambleAnswer": "...",
	"unscrambleID": 1,
	"time": "..."
}
```
