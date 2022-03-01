<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'title',
        'user_id',
        'description',
        'reminder'
    ];

    public function users()
    {
        $this->hasOne(User::class);
    }
}
