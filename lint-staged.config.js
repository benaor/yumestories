module.exports = {
  "*.{js,css,scss,ts,tsx}": [
    "prettier --write",
    "eslint --cache --quiet --fix",
  ],
  "*.{json,md,mdx,html}": ["prettier --write"],
};
