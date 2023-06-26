using System;
using System.Collections.Generic;

namespace FindGolfBackend.Models;

public partial class Course
{
    public int Id { get; set; }

    public string? Zip { get; set; }

    public string? CourseName { get; set; }

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
