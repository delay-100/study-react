// 웹팩 환경설정 파일 - 웹팩 기본 설정을 작성함
const paths = require("./paths");

module.exports = {
  mode: "production", // 프로덕션 모드로 설정하여 최적화 옵션들을 활성화
  entry: paths.ssrIndexJs, // (빌드할 때 어떤 파일에서 시작해 파일을 불러오는지) 엔트리 경로
  target: "node",
  output: {
    path: paths.ssrBuild, // (어디에 결과물을 저장할 지)빌드 경로
    filename: "server.js", // 파일 이름
    chunkFilename: "js/[name].chunk.js", // 청크 파일 이름
    publicPath: paths.publicUrlOrPath, // 정적 파일이 제공될 경로
  },
  module: {
    rules: [
        {
            oneOf: [
                // 자바스크립트를 위한 처리
                // 기존 webpack.config.js를 참고하여 작성
                {
                    test: /\.(js|mjs|msx|ts|tsx)$/,
                    include: paths.appSrc,
                    loader: require.resolve('babel-loader'),
                    options: {
                        customize: require(.resolve(
                            'babel-preset-react-app/webpack-overrides'
                        ),
                        presets: [
                            [
                                require.resolve('babel-preset-react-app'),
                                {
                                    runtime: 'automatic',
                                }
                            ]
                        ],
                        plugins: [
                            [
                                require.resolve('babel-plugin-named-asset-import'),
                                {
                                    loaderMap: {
                                        svg: {
                                            ReactComponent:
                                            '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                                        }
                                    }
                                }
                            ]
                        ],
                        cacheDirectory: true,
                        cacheCompression: false,
                        compact: false,)
                    }
                }
            ]
        }
    ]
  }
};
