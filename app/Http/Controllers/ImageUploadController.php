<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        // Validasi file gambar
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Simpan gambar ke storage
        $path = $request->file('file')->store('images', 'public');

        // Kembalikan URL gambar yang diunggah
        return response()->json(['location' => Storage::url($path)]);
    }
}
