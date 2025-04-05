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
}
