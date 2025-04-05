<?php

namespace App\Http\Controllers;

use App\Enums\UserType;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserEditRequest;
use App\Repositories\UserRepository;
use App\Http\Resources\UserCollection;
use App\Models\User;
use App\Services\UserService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    private UserRepository $repository;
    private UserService $service;

    public function __construct(UserRepository $repository, UserService $service)
    {
        $this->repository = $repository;
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $searchTerm = $request->get('search');
        $type = $request->get('type');
        $users = $this->repository->getAll(true, $searchTerm, $type);

        return Inertia::render('Users/Index', [
            'users' => $users->isEmpty() ? new UserCollection([]) : new UserCollection($users),
            'filters' => [
                'search' => $searchTerm,
                'type' => $type,
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Form', [
            'user' => null,
            'types' => UserType::cases()
        ]);
    }

    public function store(UserCreateRequest $request)
    {
        $data = $request->all();
        $this->repository->create($data);

        return redirect()->route('users.index');
    }

    public function edit(User $user)
    {
        return Inertia::render('Users/Form', [
            'user' => $user,
            'types' => UserType::cases()
        ]);
    }

    public function update(UserEditRequest $request, User $user)
    {
        $data = $request->all();
        $this->repository->update($user, $data);

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
