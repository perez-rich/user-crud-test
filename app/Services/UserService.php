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

    public function deactivate(User $user): User
    {
        $user->deactivated_at = now();
        $user->save();
        $user->delete();

        return $user;
    }

    public function restore(User $user): User
    {
        $user->restore();
        $user->deactivated_at = null;
        $user->save();

        return $user;
    }
}
