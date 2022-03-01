<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    public function index()
    {
        return Task::where('user_id', auth()->user()->id)->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
        ]);

        return Task::create([
            'uuid' => Str::uuid(),
            'user_id' => auth()->user()->id,
            'title' => $request->title,
            'description' => $request->description,
            'reminder' => $request->reminder
        ]);
    }

    public function show($id)
    {
        $task = Task::where('uuid', $id)->get();
        if($task) {
            return response($task);
        }
        return response(['error' => 'User with the id of '. $id .' does not exist']);
    }

    public function update(Request $request)
    {
        $task = Task::where('uuid', $request->uuid)
            ->where('user_id', auth()->user()->id)
            ->update([
                'title' => $request->title,
                'description' => $request->description,
                'reminder' => $request->reminder
            ]);
        if($task) {
            return $task;
        }
        return ['error' => 'User with the uuid of '. $request->uuid .' does not exist'];
    }

    public function destroy(Request $request)
    {
        return Task::where('uuid', $request->uuid)
            ->where('user_id', auth()->user()->id)
            ->delete();

    }
}
