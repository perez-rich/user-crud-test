<?php

namespace App\Http\Controllers;

use App\Enums\UserType;
use App\Repositories\UserRepository;
use App\Http\Resources\UserCollection;
use App\Models\User;
use App\Services\UserService;
use Inertia\Inertia;

class UsersController extends Controller
{
    private UserRepository $repository;
    private UserService $service;

    public function __construct(UserRepository $repository, UserService $service)
    {
        $this->repository = $repository;
        $this->service = $service;
    }

    public function index()
    {
        $users = $this->repository->getAll(true);

        return Inertia::render('Users/Index', [
            'users' => $users->isEmpty() ? new UserCollection([]) : new UserCollection($users)
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Form', [

        ]);
    }

    public function store()
    {
        // $this->service->create();

        return redirect()->route('users.index');
    }

    public function edit(User $user)
    {
        return Inertia::render('Users/Form', [
            'user' => $user,
            'types' => UserType::cases()
        ]);
    }

    public function update(User $user)
    {
        $this->service->update($user);

        return redirect()->route('users.index');
    }

    public function delete(User $user)
    {
        $this->service->deactivate($user);

        return redirect()->route('users.index');
    }

    public function restore(User $user)
    {
        $this->service->restore($user);

        return redirect()->route('users.index');
    }
}
