from django.db import migrations


def bumpdata(apps, schema_editor):
    Geo = apps.get_model("api", "Geo")
    geo = Geo.objects.create(lat="60.3943055", lng="5.3259192")

    Address = apps.get_model("api", "Address")
    address = Address.objects.create(
        street="123 Main St",
        suite="Apt 1",
        city="Norway",
        zip_code="10001",
        geo=geo,
    )

    Company = apps.get_model("api", "Company")
    company = Company.objects.create(
        name="Acme Inc",
        catch_phrase="We do stuff",
        bs="Business strategy",
    )

    UserPlaceholder = apps.get_model("api", "UserPlaceholder")
    user1 = UserPlaceholder.objects.create(
        name="John Doe",
        username="johndoe",
        email="johndoe@example.com",
        address=address,
        phone="555-555-5555",
        website="www.johndoe.com",
        company=company,
    )

    user2 = UserPlaceholder.objects.create(
        name="Jane Doe",
        username="janedoe",
        email="janedoe@example.com",
        address=address,
        phone="555-555-5555",
        website="www.janedoe.com",
        company=company,
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
        url="https://upload.wikimedia.org/wikipedia/pt/thumb/c/ce/De_Mysteriis_Dom_Sathanas.jpg/220px-De_Mysteriis_Dom_Sathanas.jpg",
        thumbnailUrl="https://upload.wikimedia.org/wikipedia/pt/thumb/c/ce/De_Mysteriis_Dom_Sathanas.jpg/220px-De_Mysteriis_Dom_Sathanas.jpg",
    )

    Photo.objects.create(
        albumId=album,
        title="My second photo",
        url="https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Venomblackmetal.jpg/220px-Venomblackmetal.jpg",
        thumbnailUrl="https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Venomblackmetal.jpg/220px-Venomblackmetal.jpg",
    )


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(bumpdata),
    ]
