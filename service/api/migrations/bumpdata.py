from django.db import migrations


def bumpdata(apps, schema_editor):

    UserPlaceholder = apps.get_model("api", "UserPlaceholder")
    user1 = UserPlaceholder.objects.create(
        name="John Doe",
        username="johndoe",
        email="johndoe@example.com",
        # Address
        address_street="666 Main St",
        address_suite="Apt 1",
        address_city="Norway",
        address_zip_code="10001",
        address_geo_lat="60.3943055",
        address_geo_lng="5.3259192",
        # Contact
        phone="666-666-6666",
        website="www.johndoe.com",
        # Company
        company_name="Acme Inc",
        company_catch_phrase="We do stuff",
        company_bs="Business strategy satanic",
    )

    user2 = UserPlaceholder.objects.create(
        name="Jane Doe",
        username="janedoe",
        email="janedoe@example.com",
        # Address
        address_street="123 Main St",
        address_suite="Apt 1",
        address_city="Norway",
        address_zip_code="10001",
        address_geo_lat="60.3943055",
        address_geo_lng="5.3259192",
        # Contact
        phone="555-555-5555",
        website="www.janedoe.com",
        # Company
        company_name="New Company Inc",
        company_catch_phrase="We do other stuff",
        company_bs="Other business strategy",
    )

    Post = apps.get_model("api", "Post")
    post1 = Post.objects.create(
        title="My first post",
        body="This is my first post",
        userId=user1,
    )

    post2 = Post.objects.create(
        title="The second post",
        body="This is the second post",
        userId=user2,
    )

    Comment = apps.get_model("api", "Comment")
    Comment.objects.create(
        name="John Doe",
        email="johndoe@example.com",
        body="Make sense",
        postId=post1,
    )

    Comment.objects.create(
        name="Jane Doe",
        email="janedoe@example.com",
        body="No way",
        postId=post2,
    )

    Todo = apps.get_model("api", "Todo")
    todo1 = Todo.objects.create(
        title="My first todo",
        completed=True,
        userId=user1,
    )

    todo2 = Todo.objects.create(
        title="My second todo",
        completed=False,
        userId=user1,
    )

    todo3 = Todo.objects.create(
        title="A todo",
        completed=False,
        userId=user2,
    )

    Album = apps.get_model("api", "Album")
    album = Album.objects.create(
        title="My first album",
        userId=user1,
    )

    Photo = apps.get_model("api", "Photo")
    Photo.objects.create(
        albumId=album,
        title="My first photo",
        url="https://placehold.co/400x400/mediumpurple/white/",
        thumbnailUrl="https://placehold.co/100x100/mediumpurple/white/",
    )

    Photo.objects.create(
        albumId=album,
        title="My second photo",
        url="https://placehold.co/400x400/skyblue/white/",
        thumbnailUrl="https://placehold.co/100x100/skyblue/white/",
    )


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(bumpdata),
    ]
