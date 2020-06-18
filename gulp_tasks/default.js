import { task, watch, series } from 'gulp';

import paths from '../gulpfile.babel';

task('default', () => watch(paths.styles.watch, series('scss')));
