<?php

namespace App\Http\Controllers\api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $posts = Post::with('author')->latest()->paginate(10);

            return ApiResponse::toJson(true, "Posts retrieved successfully", new PostResource($posts));
        } catch (\Exception $e) {
            return ApiResponse::toJson(false, "Internal server error", $e->getMessage(), 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validators = Validator::make($request->all(), [
                'author_id' => 'required|exists:users,id',
                'title' => 'required|string',
                'content' => 'required|string',
            ]);

            if ($validators->fails()) {
                throw new \Exception($validators->errors());
            }

            $input = $request->only(['author_id', 'title', 'content']);
            $post = Post::create($input);

            return ApiResponse::toJson(true, "Post created successfully", new PostResource($post), 201);
        } catch (\Exception $e) {
            return ApiResponse::toJson(false, "Create post failed", $e->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        try {
            $post->load('author');
            return ApiResponse::toJson(true, "Posts retrieved successfully", new PostResource($post));
        } catch (\Exception $e) {
            return ApiResponse::toJson(false, "Internal server error", $e->getMessage(), 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        try {
            $rules = [];
            if ($request->filled('title')) {
                $rules['title'] = 'required|string';
            }
            if ($request->filled('content')) {
                $rules['content'] = 'required|string';
            }

            $validators = Validator::make($request->all(), $rules);

            if ($validators->fails()) {
                throw new \Exception($validators->errors());
            }

            $newInput = $request->only(['title', 'content']);

            $post->update($newInput);

            return ApiResponse::toJson(true, "Posts updated successfully", new PostResource($post));
        } catch (\Exception $e) {
            return ApiResponse::toJson(false, "Update post failed", $e->getMessage(), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        try {
            $post->delete();

            return ApiResponse::toJson(true, "Post deleted successfully", "Post with id {$post->id} has been deleted");
        } catch (\Exception $e) {
            return ApiResponse::toJson(false, "Delete post failed", $e->getMessage(), 500);
        }
    }
}