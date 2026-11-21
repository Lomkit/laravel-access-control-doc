namespace App\Access\Controls;

use App\Access\Perimeters\ClientPerimeter;
use App\Access\Perimeters\GlobalPerimeter;
use App\Access\Perimeters\OwnPerimeter;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Lomkit\Access\Ability;
use Lomkit\Access\Controls\Control;
use Lomkit\Access\Perimeters\Levels;

class PostControl extends Control
{
    protected string $model = Post::class;

    protected function perimeters(): array
    {
        return [
            Levels::of(
                GlobalPerimeter::new()
                    ->allowed(fn (User $user, Ability $ability) => $user->can("{$ability} all posts"))
                    ->unrestricted(),
                ClientPerimeter::new()
                    ->allowed(fn (User $user, Ability $ability) => $user->client_id !== null && $user->can("{$ability} client posts"))
                    ->should(fn (User $user, Post $post) => $post->client_id === $user->client_id)
                    ->query(function (Builder $query, User $user): void {
                        $query->where('client_id', $user->client_id);
                    }),
                OwnPerimeter::new()
                    ->allowed(fn (User $user, Ability $ability) => $user->can("{$ability} own posts"))
                    ->should(fn (User $user, Post $post) => $post->author_id === $user->id)
                    ->query(function (Builder $query, User $user): void {
                        $query->where('author_id', $user->id);
                    }),
            ),
        ];
    }
}
