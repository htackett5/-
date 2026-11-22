#include "inventoryh_tackettproj.h"

// Array to hold the names of the categories
char* categoryNames[] = { "Electronics", "Books", "Clothing", "Other" };

// Prints the main menu
void printMenu() {
    printf(" =================================\n");
    printf(" ====== Inventory Managment ======\n");
    printf(" == 1. Add new item             ==\n");
    printf(" == 2. Print inventory          ==\n");
    printf(" == 3. Update item quantity     ==\n");
    printf(" == 4. Save inventory to file   ==\n");
    printf(" == 5. Read inventory from file ==\n");
    printf(" == 6. Exit program             ==\n");
    printf(" What would you like to do? >> ");
}

// Adds a new item to the inventory
void addItem(Item** head, int* idCounter) {
    printf("Please enter the Number of Stock, Name, Price, and Category of the item.\n");
    Item* newItem = malloc(sizeof(Item)); // Allocate memory for new item
    newItem->id = (*idCounter)++; // Assign unique ID and increment idCounter

    printf("Stock: ");
    scanf("%d", &newItem->quantity);
    while (newItem->quantity < 0) { // Validate non-negative stock
        printf("Stock cannot be negative. Stock: ");
        scanf("%d", &newItem->quantity);
    }

    printf("Name: ");
    getchar(); // Consume leftover newline character
    fgets(newItem->name, MAX_NAME_LENGTH, stdin); // Read item name
    newItem->name[strcspn(newItem->name, "\n")] = 0; // Remove newline

    printf("Price: ");
    scanf("%f", &newItem->price);
    while (newItem->price < 0) { // Validate non-negative price
        printf("Price cannot be negative. Price: ");
        scanf("%f", &newItem->price);
    }

    printf("Category (ELECTRONICS = 0, BOOKS = 1, CLOTHING = 2, OTHER = 3): ");
    scanf("%d", (int*)&newItem->category); // Read category number

    newItem->next = *head; // Insert new item at beginning of list
    *head = newItem;
}

// Displays all items in the inventory
void viewInventory(Item* head) {
    printf("%-4s%-6s%-25s%-10s%-13s\n", "ID", "Stock", "Name", "Price", "Category");
    printf("========================================================\n");
    for (Item* cur = head; cur; cur = cur->next) { // Traverse the list
        printf("%-4d%-6d%-25s%-10.2f%-13s\n",
               cur->id, cur->quantity, cur->name, cur->price, categoryNames[cur->category]);
    }
}

// Updates the quantity of an existing item by ID
void updateQuantity(Item* head) {
    int id;
    printf("Enter the ID of the item to update: ");
    scanf("%d", &id);

    Item* cur = head;
    while (cur && cur->id != id) cur = cur->next; // Find matching ID

    if (!cur) {
        printf("An Item with ID %hd was not found.\n", (short)id); // Item not found
    } else {
        int q;
        printf("Enter new quantity: ");
        scanf("%d", &q);
        while (q < 0) { // Validate non-negative quantity
            printf("Quantity cannot be negative. Enter new quantity: ");
            scanf("%d", &q);
        }
        cur->quantity = q; // Update quantity
        printf("Quantity updated for Item ID %hd.\n", (short)id);
    }
}

// Saves the inventory to a file (appends to existing file)
void saveInventory(Item* head) {
    char filename[100];
    printf("What is the name of the file to save to? ");
    scanf("%s", filename);

    FILE* f = fopen(filename, "a"); // Open file in append mode
    if (!f) return; // File failed to open

    printf("Writing contents...\n");
    int count = 0;
    for (Item* cur = head; cur; cur = cur->next) { // Traverse list
        fprintf(f, "%d,%s,%d,%.2f,%d\n",
                cur->id, cur->name, cur->quantity, cur->price, cur->category); // Write item
        count++;
    }
    fclose(f);
    printf("Successfully wrote %d items.\n", count);
}

// Loads inventory data from a file
void loadInventory(Item** head, int* idCounter) {
    char filename[100];
    printf("What is the name of the file to read from? ");
    scanf("%s", filename);

    FILE* f = fopen(filename, "r"); // Open file in read mode
    if (!f) {
        printf("ERROR: File not found. Ceasing read operation.\n");
        return;
    }

    printf("Beginning read operation...\n");
    char line[256];
    int count = 0;
    int maxId = -1;

    while (fgets(line, sizeof line, f)) { // Read each line
        Item* newItem = malloc(sizeof(Item)); // Allocate new node
        char* tok = strtok(line, ",");
        newItem->id = atoi(tok);
        if (newItem->id > maxId) maxId = newItem->id; // Track maximum ID

        tok = strtok(NULL, ",");
        strcpy(newItem->name, tok);

        tok = strtok(NULL, ",");
        newItem->quantity = atoi(tok);

        tok = strtok(NULL, ",");
        newItem->price = atof(tok);

        tok = strtok(NULL, ",");
        newItem->category = atoi(tok);

        newItem->next = *head; // Insert at beginning
        *head = newItem;
        count++;
    }
    fclose(f);

    *idCounter = maxId + 1; // Reset idCounter to avoid duplicate IDs
    printf("Successfully completed read operation, %d lines were scanned.\n", count);
}

// Frees all memory used by the inventory
void freeInventory(Item* head) {
    printf("Cleaning memory...\n");
    while (head) {
        Item* t = head;
        head = head->next;
        free(t); // Free current node
    }
    printf("Goodbye.\n");
}

// Main function that controls program flow
int main() {
    Item* head = NULL; // Pointer to head of the linked list
    int idCounter = 1; // Unique ID counter
    int choice;

    do {
        printMenu(); // Show menu
        if (scanf("%d", &choice) != 1) { // Validate input
            printf("Choice not recognized. Choose again.\n");
            while (getchar() != '\n'); // Clear bad input
            continue;
        }
        switch (choice) {
            case 1: addItem(&head, &idCounter); break;
            case 2: viewInventory(head); break;
            case 3: updateQuantity(head); break;
            case 4: saveInventory(head); break;
            case 5: loadInventory(&head, &idCounter); break;
            case 6: freeInventory(head); break;
            default: printf("Choice not recognized. Choose again.\n");
        }
    } while (choice != 6);

    return 0;
}

