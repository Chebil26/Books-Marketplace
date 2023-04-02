import csv
from django.core.management.base import BaseCommand
from books.models import Book

class Command(BaseCommand):
    help = 'Load data from a CSV file into the database'

    def add_arguments(self, parser):
        parser.add_argument('books.csv', help='books/books.csv')

    def handle(self, *args, **options):
        filename = options['books.csv']
        with open(filename, 'r') as f:
            reader = csv.reader(f)
            next(reader)  # skip header row
            for row in reader:
                book = Book(
                    isbn=row[0],
                    title=row[2],
                    author=row[4],
                    cover=row[6],
                    description=row[7],
                    year=row[8],
                    num_pages=row[10],
                    
                    # add other fields as needed
                )
                


                book.save()
        self.stdout.write(self.style.SUCCESS('Data loaded successfully.'))