import autoPreprocess from '../../src';
import { preprocess } from '../utils';

const BABEL_CONFIG = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        targets: {
          esmodules: true,
        },
      },
    ],
  ],
};

beforeAll(() => jest.setTimeout(10000));
afterAll(() => jest.setTimeout(5000));

describe('transformer - babel', () => {
  it('transpiles with babel', async () => {
    const template = `<script>
let foo = {}
$: bar = foo?.b ?? 120
</script>`;

    const opts = autoPreprocess({
      babel: BABEL_CONFIG,
    });

    const preprocessed = await preprocess(template, opts);

    expect(preprocessed.code).toMatchInlineSnapshot(`
      "<script>var _foo$b;

      var foo = {};

      $: bar = (_foo$b = foo == null ? void 0 : foo.b) != null ? _foo$b : 120;</script>"
    `);
  });
});
