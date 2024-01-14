<tr>
    <td>{{ $user->id }}</td>
    <td>{{ $user->name }}</td>
    <td>{{ $user->email }}</td>
    <td>{{ $user->user_uuid }}</td>
    <td>{{ $user->role }}</td>

    <td>
        <form action="{{ route('user.promote', $user->id) }}" method="POST">
            @csrf
            @method('put')
            <button type="submit" class="btn btn-link">
                <i class="fas fa-arrow-up"></i>
            </button>
        </form>
    </td>
    <td>
        <form action="{{ route('user.demote', $user->id) }}" method="POST">
            @csrf
            @method('put')
            <button type="submit" class="btn btn-link">
                <i class="fas fa-arrow-down"></i>
            </button>
        </form>
    </td>
    <td>
        <form action="{{ route('user.destroy', $user->id) }}" method="POST">
            @csrf
            @method('delete')
            <button type="submit" class="btn btn-link">
                <i class="fas fa-trash-alt"></i>
            </button>
        </form>
    </td>
</tr>

{{-- <th>Name</th>
<th>Email</th>
<th>Uuid</th>
<th>Role</th>
<th>Promote</th>
<th>Demote</th> --}}
