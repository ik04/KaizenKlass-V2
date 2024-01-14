@extends('layout/user-layout')
@section('content')
    <section class="section">
        <div class="row">
            <div class="col-lg-12">
                @include('includes/success-message')
                @include('includes/error-message')
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Subjects</h5>
                        <!-- Table with stripped rows -->
                        <table class="table datatable">
                            <thead>
                                <tr>
                                    <th>
                                        <b>i</b>d
                                    </th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Uuid</th>
                                    <th>Role</th>
                                    <th>Promote</th>
                                    <th>Demote</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($users as $user)
                                    @include('includes/user/table-record')
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </section>
@endsection
