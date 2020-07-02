namespace DatingApp.API.Helpers
{
    public class PaginationHeader
    {
        public int CurrentPages { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }

        public PaginationHeader(int currentPages, int itemsPerPage, int totalItems,
                                int totalPages)
        {
            this.CurrentPages = currentPages;
            this.ItemsPerPage = itemsPerPage;
            this.TotalItems = totalItems;
            this.TotalPages = totalPages;
        }
    }
}