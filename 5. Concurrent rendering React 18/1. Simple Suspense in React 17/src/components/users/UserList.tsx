import { useState } from 'react';
import useSWR from 'swr';
import type { Account } from '../../types';
import { UserDetails } from './UserDetails';

export function UserList() {
  const [selectedUser, setSelectedUser] = useState<Account | null>(null);
  const { data } = useSWR<Account[], Error>(
    `${process.env.REACT_APP_API_BASE}/accounts`
  );

  return (
    <div className="row">
      <h2 className="text-center mt-5">Users</h2>

      <div className="col-3 g-2">
        <ul className="list-group">
          {data?.map((user) => (
            <li
              key={user.id}
              className={
                'list-group-item' + (user === selectedUser ? ' active' : '')
              }
            >
              <button
                className="btn shadow-none"
                onClick={() => setSelectedUser(user)}
              >
                {user.firstname}
                &nbsp;
                {user.surname}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-6">
        {selectedUser && (
          <UserDetails
            userId={selectedUser.id}
            movieId={selectedUser.favorite_movie}
          />
        )}
      </div>
    </div>
  );
}
