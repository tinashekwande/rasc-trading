const OptimizedImage = ({ src, alt, width, height, priority = false, className, style }) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    loading={priority ? 'eager' : 'lazy'}
    decoding={priority ? 'sync' : 'async'}
    className={className}
    style={{ maxWidth: '100%', height: 'auto', ...style }}
  />
);

export default OptimizedImage;
