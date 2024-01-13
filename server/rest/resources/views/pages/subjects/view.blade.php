@extends('layout/user-layout')
@section('content')
    <section class="section">
        <div class="row">
            <div class="col-lg-12">
                @include('includes/success-message')
                @include('includes/error-message')
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Users</h5>
                        <!-- Table with stripped rows -->
                        <table class="table datatable">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Subject</th>
                                    <th>Uuid</th>
                                    <th data-type="date" data-format="YYYY/DD/MM">Created At</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($subjects as $subject)
                                    @include('includes/subjects/table-record')
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </section>
@endsection
