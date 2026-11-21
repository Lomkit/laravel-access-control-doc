ClientPerimeter::new()
    // allowed(), should() and query() as in step 1
    ->searchKeys(name: 'client', row: fn (Post $post) => $post->client_id, reader: fn (User $user) => $user->client_id),
OwnPerimeter::new()
    // allowed(), should() and query() as in step 1
    ->searchKeys(name: 'author', row: fn (Post $post) => $post->author_id, reader: fn (User $user) => $user->id),
