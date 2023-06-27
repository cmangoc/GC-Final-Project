using System;
using System.Collections.Generic;

namespace FindGolfBackend.Models;

public partial class Review
{
    public int Id { get; set; }

    public string? Review1 { get; set; }

    public int? CourseId { get; set; }

    public virtual User? User { get; set; }
}
