<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Collection;

class UserRepository
{
    /**
     *  @return Illuminate\Support\Collection|User[]
     */
    public function getAll($includeDeactivated = false): Collection
    {
        return User::when($includeDeactivated, fn($query) => $query->withTrashed())
            ->orderBy('last_login_at', 'desc')
            ->get();
    }

    /**
     * @param array $data
     * @return User
     */
    public function create(array $data): User
    {
        return User::create($data);
    }

    /**
     * @param User $user
     * @param array $data
     * @return User
     */
    public function update(User $user, array $data): User
    {
        $user->fill($data);
        $user->save();

        return $user;
    }

    /**
     * @param User $user
     * @return User
     */
    public function delete(User $user): User
    {
        $user->delete();

        return $user;
    }

    /**
     * @param User $user
     * @return User
     */
    public function restore(User $user): User
    {
        $user->restore();

        return $user;
    }
}
