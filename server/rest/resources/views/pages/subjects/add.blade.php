@extends('layout/user-layout')
@section('content')
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Add Subject Form</h5>
            @include('includes/success-message')

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
@endsection
