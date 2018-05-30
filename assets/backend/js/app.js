var hash = {
    'foo': require('./foo'),
    'bar': require('./bar')
};

hash['foo']('app');
hash['bar']('app');
