#!/bin/bash
# /fc — FounderCode Install Script
# Installs all /fc skills into your Claude Code environment

set -e

SKILLS_DIR="$HOME/.claude/skills"
REPO_BASE="https://raw.githubusercontent.com/VedSoni-dev/FCstack/main/skills"

SKILLS=("fc" "fc-apply" "fc-interview" "fc-office-hours" "fc-demo-day")

echo ""
echo "  /fc — installing FounderCode skills..."
echo ""

for skill in "${SKILLS[@]}"; do
  mkdir -p "$SKILLS_DIR/$skill"
  echo "  → installing /$skill"
  curl -fsSL "$REPO_BASE/$skill/SKILL.md" -o "$SKILLS_DIR/$skill/SKILL.md"
done

echo ""
echo "  ✓ installed ${#SKILLS[@]} skills"
echo ""
echo "  Run /fc in any project to get started."
echo ""
