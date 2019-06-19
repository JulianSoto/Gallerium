import {join} from 'path';
import {Pages} from '../routing';

export default class Config {
  use(app, {json, urlencoded, statics}, {init}, logger, router) {
    app.use(json());
    app.use(urlencoded({extended: false}));
    app.use(
        statics(join(__dirname, '../../UI/static'), {
          setHeaders: (res, loc, stat) => {
            res.set('Service-Worker-Allowed', '/');
          }
        })
    );
    app.use(init());
    app.use(logger('dev'));
    app.use('/api/v1', router);
    Pages.serve(app);
  }
}
