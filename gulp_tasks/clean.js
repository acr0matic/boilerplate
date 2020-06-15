import { task } from 'gulp';
import del from 'del';

import paths from '../gulpfile.babel';

task('clean', () => del([paths.dist]));
