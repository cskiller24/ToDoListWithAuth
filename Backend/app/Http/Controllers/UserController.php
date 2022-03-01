<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function show($id)
    {
        $user = User::find($id);
        if($user) {
            return $user;
        }
        return ['error' => 'User with the id of '.$id.' does not exist.'];
    }

    public function update(Request $request)
    {
        $user = User::find(auth()->user()->id);
        if($user) {
            $user->update($request->all());
            return $user;
        }
        return ['error' => 'User with id of '.$request->id.' does not exist.'];
    }

    public function destroy()
    {
        return User::destroy(auth()->user()->id);
    }
}
