<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use App\Http\Resources\UserCollection;
use Inertia\Inertia;

class UsersController extends Controller
{
    private UserRepository $users;

    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    public function index()
    {
        $users = $this->users->getAll();

        return Inertia::render('Users/Index', [
            'users' => new UserCollection($users)
        ]);
    }
}
