# Changelog

All notable changes to Image Safety Check will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-11-26

### Added
- Initial release of Image Safety Check
- NSFW detection using NSFWJS model
- Support for multiple image input types (HTMLImageElement, HTMLCanvasElement, ImageData, URL)
- Detailed safety check results with confidence scores
- Simple boolean checks (`isImageSafe`, `containsNudity`)
- Custom threshold configuration
- Client-side processing (no external API calls)
- TypeScript support with full type definitions
- Comprehensive documentation and examples
- AI-friendly API documentation

### Features
- **NSFW Detection**: Detect nudity, explicit content, and inappropriate material
- **Confidence Scores**: Get detailed probability scores for different categories
- **Multiple Input Types**: Supports images, canvas, ImageData, URLs
- **Privacy-First**: All processing happens client-side
- **Fast & Accurate**: Powered by TensorFlow.js and NSFWJS model

[0.1.0]: https://github.com/upendra-manike/JSLib/releases/tag/image-safety-check-v0.1.0


