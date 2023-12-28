@extends('layout/user-layout')
@section('content')
    @include('includes/success-message')
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Add Subject Form</h5>

            <!-- Horizontal Form -->
            <form action="{{ route('subject.create') }}" method="POST">
                @csrf

                <div class="row mb-3">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Subject</label>
                    <div class="col-sm-10">
                        <input type="text" name="subject" class="form-control" id="inputText">
                    </div>
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <button type="reset" class="btn btn-secondary">Reset</button>
                </div>
            </form><!-- End Horizontal Form -->

        </div>
    </div>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Add Subjects Form</h5>
            <!-- Horizontal Form -->
            @foreach ($errors->all() as $error)
                <p class="text-danger">{{ $error }}</p>
            @endforeach
            <form action="{{ route('subject.create.multiple') }}" method="POST">
                @csrf
                <div class="row mb-3">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Subjects</label>
                    <div class="col-sm-10">
                        <textarea name="subjects" class="form-control" style="height: 100px"></textarea>
                    </div>
                </div>

                <div class="text-center">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <button type="reset" class="btn btn-secondary">Reset</button>
                </div>
            </form><!-- End Horizontal Form -->

        </div>
    </div>
@endsection
