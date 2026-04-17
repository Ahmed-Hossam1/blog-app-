// This declaration tells TypeScript that importing .css files is valid.
// Next.js handles CSS imports via its bundler, but TypeScript's language
// server doesn't know about them — this silences the false "not recognized" error.
declare module "*.css" {
  const styles: { [className: string]: string };
  export default styles;
}
