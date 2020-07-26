function internalLink(ctx) {
  const { url, filename, className } = (ctx && ctx.hash) || { url: "" };

  const useHash = !url || url.startsWith(filename);

  return `
    <a href="${useHash ? "#" : url}" ${className ? `class="${className}"` : ""}>
      ${ctx.fn(this)}
    </a>
  `.trim();
}

module.exports = {
  internalLink,
};
