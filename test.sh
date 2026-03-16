#!/usr/bin/env bash
set -euo pipefail

# YCstack setup tests — verifies installation idempotency and correctness

PASS=0
FAIL=0
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

pass() { echo "  PASS: $1"; PASS=$((PASS + 1)); }
fail() { echo "  FAIL: $1"; FAIL=$((FAIL + 1)); }

echo "Running YCstack setup tests..."
echo ""

# Use a temp home to avoid touching real config
export HOME=$(mktemp -d)
mkdir -p "$HOME/.claude"

# Test 1: Fresh install
echo "Test 1: Fresh install"
bash "$SCRIPT_DIR/setup" > /dev/null 2>&1
if [ -d "$HOME/.claude/skills/yc" ] || [ -L "$HOME/.claude/skills/yc" ]; then
  pass "Skill directory created"
else
  fail "Skill directory not created"
fi

if grep -q "YCstack" "$HOME/.claude/CLAUDE.md" 2>/dev/null; then
  pass "CLAUDE.md updated"
else
  fail "CLAUDE.md not updated"
fi

# Test 2: Idempotent re-install
echo "Test 2: Re-install (idempotency)"
bash "$SCRIPT_DIR/setup" > /dev/null 2>&1
COUNT=$(grep -c "YCstack" "$HOME/.claude/CLAUDE.md" 2>/dev/null || echo 0)
if [ "$COUNT" -le 2 ]; then
  pass "CLAUDE.md not duplicated"
else
  fail "CLAUDE.md has duplicate YCstack sections ($COUNT occurrences)"
fi

if [ -d "$HOME/.claude/skills/yc" ] || [ -L "$HOME/.claude/skills/yc" ]; then
  pass "Skill directory still valid after re-install"
else
  fail "Skill directory broken after re-install"
fi

# Test 3: SKILL.md accessible
echo "Test 3: SKILL.md accessible"
if [ -f "$HOME/.claude/skills/yc/SKILL.md" ]; then
  pass "SKILL.md exists in skill directory"
else
  fail "SKILL.md not found in skill directory"
fi

# Test 4: SKILL.md has valid frontmatter
echo "Test 4: SKILL.md frontmatter"
if head -1 "$HOME/.claude/skills/yc/SKILL.md" | grep -q "^---"; then
  pass "SKILL.md has frontmatter"
else
  fail "SKILL.md missing frontmatter"
fi

if grep -q "WebFetch" "$HOME/.claude/skills/yc/SKILL.md"; then
  pass "SKILL.md includes WebFetch in allowed-tools"
else
  fail "SKILL.md missing WebFetch in allowed-tools"
fi

# Cleanup
rm -rf "$HOME"

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] && exit 0 || exit 1
