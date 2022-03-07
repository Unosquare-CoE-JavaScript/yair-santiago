import { SuspenseList } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../ErrorFallback';
import { AccountDetails } from './AccountDetails';
import { MovieDetails } from './MovieDetails';

interface Props {
  userId: number;
  movieId: number;
}
export function UserDetails({ userId, movieId }: Props) {
  return (
    <div>
      <h4 className="text-center mt-5">User details</h4>
      <SuspenseList revealOrder="together">
        {/* <Suspense fallback={<Loading/>}> */}
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AccountDetails userId={userId} />
          </ErrorBoundary>
        {/* </Suspense> */}
        <h4 className="text-center mt-5">Favorite movie</h4>
        {/* <Suspense fallback={<Loading/>}> */}
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <MovieDetails movieId={movieId} />
          </ErrorBoundary>
        {/* </Suspense> */}
      </SuspenseList>
    </div>
  );
}
