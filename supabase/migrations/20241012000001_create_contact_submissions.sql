-- Create contact_submissions table for storing contact form data
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    inquiry_type VARCHAR(50) NOT NULL CHECK (inquiry_type IN ('admission', 'academic', 'transport', 'fees', 'facilities', 'general', 'complaint')),
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    student_class VARCHAR(20),
    preferred_contact VARCHAR(20) NOT NULL CHECK (preferred_contact IN ('email', 'phone', 'whatsapp', 'any')),
    status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'resolved', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    admin_notes TEXT,
    replied_at TIMESTAMP WITH TIME ZONE,
    replied_by UUID REFERENCES auth.users(id)
);

-- Create indexes for better performance
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_inquiry_type ON contact_submissions(inquiry_type);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at column
CREATE TRIGGER update_contact_submissions_updated_at 
    BEFORE UPDATE ON contact_submissions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- 1. Allow anonymous users to insert contact submissions (public can submit forms)
CREATE POLICY "Allow anonymous insert contact submissions" 
    ON contact_submissions 
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

-- 2. Allow authenticated users to insert contact submissions
CREATE POLICY "Allow authenticated insert contact submissions" 
    ON contact_submissions 
    FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

-- 3. Allow authenticated admin users to read all contact submissions
-- Note: You'll need to create an admin role or use a custom claim
CREATE POLICY "Allow admin read contact submissions" 
    ON contact_submissions 
    FOR SELECT 
    TO authenticated 
    USING (
        auth.jwt() ->> 'role' = 'admin' OR
        auth.jwt() ->> 'user_role' = 'admin' OR
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.email ILIKE '%@dtnhs.edu.in'
        )
    );

-- 4. Allow authenticated admin users to update contact submissions
CREATE POLICY "Allow admin update contact submissions" 
    ON contact_submissions 
    FOR UPDATE 
    TO authenticated 
    USING (
        auth.jwt() ->> 'role' = 'admin' OR
        auth.jwt() ->> 'user_role' = 'admin' OR
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.email ILIKE '%@dtnhs.edu.in'
        )
    )
    WITH CHECK (
        auth.jwt() ->> 'role' = 'admin' OR
        auth.jwt() ->> 'user_role' = 'admin' OR
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.email ILIKE '%@dtnhs.edu.in'
        )
    );

-- 5. Allow users to read their own submissions (optional)
CREATE POLICY "Allow users read own submissions" 
    ON contact_submissions 
    FOR SELECT 
    TO authenticated 
    USING (email = auth.jwt() ->> 'email');

-- Create a view for admin dashboard (optional)
CREATE OR REPLACE VIEW contact_submissions_summary AS
SELECT 
    inquiry_type,
    status,
    COUNT(*) as count,
    MIN(created_at) as oldest_submission,
    MAX(created_at) as newest_submission
FROM contact_submissions 
GROUP BY inquiry_type, status
ORDER BY inquiry_type, status;

-- Grant permissions on the view
GRANT SELECT ON contact_submissions_summary TO authenticated;

-- Create function to get contact submission statistics
CREATE OR REPLACE FUNCTION get_contact_stats()
RETURNS TABLE (
    total_submissions BIGINT,
    unread_count BIGINT,
    read_count BIGINT,
    replied_count BIGINT,
    resolved_count BIGINT,
    today_submissions BIGINT,
    this_week_submissions BIGINT,
    this_month_submissions BIGINT
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (SELECT COUNT(*) FROM contact_submissions) as total_submissions,
        (SELECT COUNT(*) FROM contact_submissions WHERE status = 'unread') as unread_count,
        (SELECT COUNT(*) FROM contact_submissions WHERE status = 'read') as read_count,
        (SELECT COUNT(*) FROM contact_submissions WHERE status = 'replied') as replied_count,
        (SELECT COUNT(*) FROM contact_submissions WHERE status = 'resolved') as resolved_count,
        (SELECT COUNT(*) FROM contact_submissions WHERE DATE(created_at) = CURRENT_DATE) as today_submissions,
        (SELECT COUNT(*) FROM contact_submissions WHERE created_at >= DATE_TRUNC('week', NOW())) as this_week_submissions,
        (SELECT COUNT(*) FROM contact_submissions WHERE created_at >= DATE_TRUNC('month', NOW())) as this_month_submissions;
END;
$$;

-- Grant execute permission on the function to authenticated users
GRANT EXECUTE ON FUNCTION get_contact_stats() TO authenticated;

-- Insert some sample inquiry types for reference (optional)
COMMENT ON COLUMN contact_submissions.inquiry_type IS 'Type of inquiry: admission, academic, transport, fees, facilities, general, complaint';
COMMENT ON COLUMN contact_submissions.preferred_contact IS 'Preferred contact method: email, phone, whatsapp, any';
COMMENT ON COLUMN contact_submissions.status IS 'Submission status: unread, read, replied, resolved, archived';
COMMENT ON COLUMN contact_submissions.student_class IS 'Student class if applicable (nursery, lkg, ukg, class-1 to class-12)';

-- Create notification function for new submissions (optional)
CREATE OR REPLACE FUNCTION notify_new_contact_submission()
RETURNS TRIGGER AS $$
BEGIN
    -- This can be used to send notifications to admins
    -- You can integrate this with email services or push notifications
    INSERT INTO notifications (
        type,
        title,
        message,
        data,
        created_at
    ) VALUES (
        'new_contact_submission',
        'New Contact Form Submission',
        'New ' || NEW.inquiry_type || ' inquiry from ' || NEW.name,
        json_build_object(
            'submission_id', NEW.id,
            'name', NEW.name,
            'email', NEW.email,
            'inquiry_type', NEW.inquiry_type,
            'subject', NEW.subject
        ),
        NOW()
    );
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- If notifications table doesn't exist, just continue
        RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for notifications (only if notifications table exists)
-- CREATE TRIGGER new_contact_submission_notification
--     AFTER INSERT ON contact_submissions
--     FOR EACH ROW
--     EXECUTE FUNCTION notify_new_contact_submission();

-- Final setup comments
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from the school website with RLS enabled for security';