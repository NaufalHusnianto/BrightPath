<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddScoreAndFeedbackToSubmissionsTable extends Migration
{
    public function up()
    {
        Schema::table('submissions', function (Blueprint $table) {
            $table->integer('score')->nullable();
            $table->text('feedback')->nullable();
        });
    }

    public function down()
    {
        Schema::table('submissions', function (Blueprint $table) {
            $table->dropColumn(['score', 'feedback']);
        });
    }
}
