module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'jest': true,
    'node': true
  },
  'extends': ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended", "next"],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
      'modules': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'settings': {
    'react': {
      'pragma': 'React',
      'version': 'detect'
    }
  },
  'plugins': ['react', '@typescript-eslint', 'align-import'],
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'key-spacing': [1, {
      'align': 'colon',
      'beforeColon': true,
      'afterColon': true
    }],
    'import/no-namespace': 0,
    'no-invalid-this': 0,
    'babel/no-invalid-this': 0,
    'class-methods-use-this': [1, {
      'exceptMethods': ['componentWillMount', 'componentDidMount', 'render', 'componentDidUpdate', 'componentWillReceiveProps', 'componentWillUnmount', 'componentWillUpdate', 'shouldComponentUpdate']
    }],
    'react/jsx-uses-vars': 2,
    'curly': 2,
    'no-alert': 0,
    'no-console': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'always'],
    'space-before-function-paren': ['error', 'always'],
    'comma-dangle': ['error', 'always'],
    'react/jsx-curly-spacing': ['error', 'never'],
    'react/jsx-curly-brace-presence': ['error', {
      'props': 'always',
      'children': 'never'
    }],
    'react/prop-types': 0,
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': 'none',
        'requireLast': true
      },
      'singleline': {
        'delimiter': 'semi',
        'requireLast': false
      }
    }],
    'react-hooks/exhaustive-deps': 'error',
    'no-multi-spaces': ['error', {
      'exceptions': {
        'ImportDeclaration': true
      }
    }],
    'align-import/align-import': ['error'],
    'react/react-in-jsx-scope': 'off'
  },
  'overrides': [{
    // enable the rule specifically for TypeScript files
    'files': ['*.ts', '*.tsx'],
    'rules': {
      '@typescript-eslint/explicit-function-return-type': ['error']
    }
  }, {
    // enable the rule specifically for TypeScript files
    files: ['parseCloudCode/**/*.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 0
    },
    globals: {
      'Parse': true
    }
  }]
};
