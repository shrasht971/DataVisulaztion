import { useState } from 'react';
import { List, ListItem, ListItemText, Checkbox, IconButton, Collapse, Box } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

interface Department {
    name: string;
    subDepartments: string[];
}

const departments: Department[] = [
    {
        name: "HR",
        subDepartments: ["Recruitment", "Payroll"]
    },
    {
        name: "Engineering",
        subDepartments: ["Development", "Testing"]
    }
];

const DepartmentComponent = () => {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

    const handleToggle = (department: string) => {
        setExpanded(expanded === department ? null : department);
    };

    const handleSelect = (department: string, subDepartment?: string) => {
        if (subDepartment) {
            setSelectedDepartments(prev =>
                prev.includes(subDepartment)
                    ? prev.filter(sd => sd !== subDepartment)
                    : [...prev, subDepartment]
            );

            const allSubDepartments = departments.find(d => d.name === department)?.subDepartments || [];
            const allSelected = allSubDepartments.every(sd => selectedDepartments.includes(sd));

            if (allSelected) {
                setSelectedDepartments(prev => [...prev, department]);
            } else {
                setSelectedDepartments(prev => prev.filter(d => d !== department));
            }
        } else {
            const subDepartments = departments.find(d => d.name === department)?.subDepartments || [];
            const newSelection = selectedDepartments.includes(department)
                ? selectedDepartments.filter(sd => sd !== department && !subDepartments.includes(sd))
                : [...selectedDepartments, department, ...subDepartments];
            setSelectedDepartments(newSelection);
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List>
                {departments.map(dept => (
                    <div key={dept.name}>
                        <ListItem onClick={() => handleToggle(dept.name)} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Checkbox
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                                checked={selectedDepartments.includes(dept.name)}
                                onChange={() => handleSelect(dept.name)}
                            />
                            <ListItemText primary={dept.name} />
                            <IconButton edge="end">
                                {expanded === dept.name ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        </ListItem>
                        <Collapse in={expanded === dept.name} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {dept.subDepartments.map(subDept => (
                                    <ListItem key={subDept} sx={{ pl: 4 }}>
                                        <Checkbox
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                            checked={selectedDepartments.includes(subDept)}
                                            onChange={() => handleSelect(dept.name, subDept)}
                                        />
                                        <ListItemText primary={subDept} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </div>
                ))}
            </List>
        </Box>
    );
};

export default DepartmentComponent;
