<tr>
    <td>{{ $subject->id }}</td>
    <td>{{ $subject->subject }}</td>
    <td>{{ $subject->subject_uuid }}</td>
    <td>{{ $subject->created_at }}</td>
    <td>
        <form action="{{ route('subject.destroy', $subject->id) }}" method="POST">
            @csrf
            @method('delete')
            <button type="submit" class="btn btn-link">
                <i class="fas fa-trash-alt"></i>
            </button>
        </form>
    </td>
</tr>
