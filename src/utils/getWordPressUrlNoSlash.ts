export function getWordPressUrlNoSlash() {
  return process.env.NEXT_PUBLIC_WORDPRESS_URL?.replace(/\/$/, "");
}
