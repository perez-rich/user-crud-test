<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function trackLogin(User $user): User
    {
        $user->last_login_at = now();
        $user->save();

        return $user;
    }
}
