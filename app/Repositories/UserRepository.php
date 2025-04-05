<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Collection;

class UserRepository
{
    /**
     *  @return Illuminate\Support\Collection|User[]
     */
    public function getAll(): Collection
    {
        return User::orderBy('last_login_at', 'desc')->get();
    }
}
