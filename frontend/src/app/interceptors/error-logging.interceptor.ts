import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

/**
 * Global error logging interceptor
 * Logs HTTP errors to the browser console for transparency while letting
 * components decide how to present errors to users.
 */
export const errorLoggingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = Date.now();
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const elapsed = Date.now() - started;
      // Basic structured log
      // Do not log sensitive data (request body, auth headers)
      // but include method, URL (without params), status, and message
      // eslint-disable-next-line no-console
      console.error('[HTTP ERROR]', {
        method: req.method,
        url: req.url.split('?')[0],
        status: error.status,
        statusText: error.statusText,
        message: error.message,
        elapsedMs: elapsed
      });
      return throwError(() => error);
    })
  );
};
