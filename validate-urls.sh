#!/usr/bin/env bash
set -euo pipefail

# Validates that all skill URLs in index.json are reachable
# Run before pushing to catch broken links

REPO="VedSoni-dev/YCstack"
BRANCH="main"
BASE="https://raw.githubusercontent.com/$REPO/$BRANCH/skills"

PASS=0
FAIL=0

echo "Validating YCstack skill URLs..."
echo "Base: $BASE"
echo ""

# Validate index.json itself
echo "Checking index.json..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/index.json")
if [ "$STATUS" = "200" ]; then
  echo "  PASS: index.json (HTTP $STATUS)"
  ((PASS++))
else
  echo "  FAIL: index.json (HTTP $STATUS)"
  ((FAIL++))
fi

# Validate each skill file listed in local index.json
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "$SCRIPT_DIR/skills/index.json" ]; then
  # Extract file names from index.json
  FILES=$(grep '"file"' "$SCRIPT_DIR/skills/index.json" | sed 's/.*"file": *"\([^"]*\)".*/\1/')
  for FILE in $FILES; do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/$FILE")
    if [ "$STATUS" = "200" ]; then
      echo "  PASS: $FILE (HTTP $STATUS)"
      ((PASS++))
    else
      echo "  FAIL: $FILE (HTTP $STATUS) — skill will be unavailable"
      ((FAIL++))
    fi
  done
else
  echo "  WARN: Local skills/index.json not found. Skipping individual skill checks."
fi

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] && exit 0 || exit 1
